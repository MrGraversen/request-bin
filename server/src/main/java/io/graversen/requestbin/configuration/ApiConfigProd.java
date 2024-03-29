package io.graversen.requestbin.configuration;

import io.graversen.requestbin.service.requestbin.RequestBin;
import io.graversen.requestbin.service.requestbin.RequestBinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.reactive.config.WebFluxConfigurer;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.function.Predicate;

@Slf4j
@Configuration
@Profile("prod")
@EnableScheduling
@RequiredArgsConstructor
@ComponentScan(basePackages = "io.graversen.requestbin.api")
public class ApiConfigProd implements WebFluxConfigurer {
    private final RequestBinProperties requestBinProperties;
    private final RequestBinService requestBinService;

    @Scheduled(fixedDelayString = "PT1H")
    public void closeExpiredRequestBins() {
        final var now = LocalDateTime.now();
        final var deleteAt = now.minus(requestBinProperties.getBinExpiryDuration());

        requestBinService.getOpenBins().stream()
                .filter(discardPersistentBins())
                .filter(isExpirable())
                .filter(isExpired(deleteAt))
                .peek(requestBin -> log.info("Cleaning up bin: {}", requestBin.getBinId()))
                .forEach(requestBin -> requestBinService.closeBin(requestBin.getBinId()));
    }

    private Predicate<RequestBin> discardPersistentBins() {
        return requestBin -> !requestBinProperties.getPersistentBins().contains(requestBin.getBinId());
    }

    private Predicate<RequestBin> isExpirable() {
        return requestBin -> Objects.nonNull(requestBin.getExpiresAt());
    }

    private Predicate<RequestBin> isExpired(LocalDateTime deleteAt) {
        return requestBin -> requestBin.getCreatedAt().isBefore(deleteAt);
    }
}
