package io.graversen.requestbin.data.cassandra;

import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.util.UUID;

@Repository
public interface RequestByRequestBinRepository extends ReactiveCassandraRepository<RequestByRequestBinEntity, Void> {
    Flux<RequestByRequestBinEntity> findAllByBinId(String binId);
    Flux<RequestByRequestBinEntity> findByBinIdAndBucketAfter(String binId, UUID bucket);
}
