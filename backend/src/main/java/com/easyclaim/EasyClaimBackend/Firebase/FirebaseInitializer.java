package com.easyclaim.EasyClaimBackend.Firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.File;
import java.io.InputStream;
import java.util.Objects;

import static org.apache.commons.codec.Resources.getInputStream;


@Service
public class FirebaseInitializer {

    @PostConstruct
    public void initialization() {

        InputStream fstream = getInputStream("serviceAccountKey.json");


        try {
            assert fstream != null;
            FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(fstream))
                .build();

            FirebaseApp.initializeApp(options);

        }catch (Exception e) {
            e.printStackTrace();
        }

    }

}