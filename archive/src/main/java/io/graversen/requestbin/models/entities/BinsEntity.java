package io.graversen.requestbin.models.entities;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "bins")
public class BinsEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "identifier", unique = true, nullable = false, length = 50)
    private String identifier;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "discarded_at")
    private LocalDateTime discardedAt;

    @OneToMany(mappedBy = "bin")
    private Collection<HttpRequestsEntity> httpRequests;

    public BinsEntity()
    {

    }

    public BinsEntity(String identifier)
    {
        this.identifier = identifier;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId()
    {
        return id;
    }

    public String getIdentifier()
    {
        return identifier;
    }

    public LocalDateTime getCreatedAt()
    {
        return createdAt;
    }

    public LocalDateTime getDiscardedAt()
    {
        return discardedAt;
    }

    public void setDiscardedAt(LocalDateTime discardedAt)
    {
        this.discardedAt = discardedAt;
    }

    public Collection<HttpRequestsEntity> getHttpRequests()
    {
        return httpRequests;
    }

    public void setHttpRequests(Collection<HttpRequestsEntity> httpRequests)
    {
        this.httpRequests = httpRequests;
    }
}
