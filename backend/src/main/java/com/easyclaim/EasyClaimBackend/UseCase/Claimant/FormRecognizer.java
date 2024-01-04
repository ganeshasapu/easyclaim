package com.easyclaim.EasyClaimBackend.UseCase.Claimant;

import java.util.HashMap;

public interface FormRecognizer {

    HashMap<String, String> getKeyValuePairs();

    HashMap<String, HashMap<String, String>> getTableContent();
}
