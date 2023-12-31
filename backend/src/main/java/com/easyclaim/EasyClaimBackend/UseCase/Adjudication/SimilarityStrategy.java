package com.easyclaim.EasyClaimBackend.UseCase.Adjudication;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

public interface SimilarityStrategy {

    int getComparisonScore(LifeClaim claimOne, LifeClaim claimTwo);

    float getIntervalScore(float max, float punish, int numberOne, int numberTwo);
}
