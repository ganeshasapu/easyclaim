package com.easyclaim.EasyClaimBackend.UseCase.Claimant;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class OcrService {

    private FormRecognizer ocrModel;

    public void func() {
        ArrayList<HashMap> lust = new ArrayList<>();
    }
}
