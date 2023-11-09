package com.easyclaim.EasyClaimBackend.Entity;

public class SimilarClaim {

    private float similarityScore;
    private LifeClaim claim;

    public SimilarClaim(float similarityScore, LifeClaim claim) {
        this.similarityScore = similarityScore;
        this.claim = claim;
    }

    public float getSimilarityScore() {
        return similarityScore;
    }

    public LifeClaim getClaim() {
        return claim;
    }

    public int compareTo(SimilarClaim otherClaim) {
        return Float.compare(this.similarityScore, otherClaim.similarityScore);
    }

}
