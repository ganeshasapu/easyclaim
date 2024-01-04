import com.azure.ai.formrecognizer.*;

import com.azure.ai.formrecognizer.documentanalysis.implementation.models.AnalyzeDocumentRequest;
import com.azure.ai.formrecognizer.documentanalysis.implementation.models.AnalyzeResultOperation;
import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;


public class FormRecognizer {

    // set `<your-endpoint>` and `<your-key>` variables with the values from the Azure portal
    private static final String endpoint = "https://easyclaim-ocr.cognitiveservices.azure.com/";
    private static final String key = "0d38e64ca90a42d5b46e18e655abf831";

    public static void main(String[] args) throws IOException {

        // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
        DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
                .credential(new AzureKeyCredential(key))
                .endpoint(endpoint)
                .buildClient();

        SyncPoller<OperationResult, AnalyzeResult> analyzeLayoutResultPoller =
                client.beginAnalyzeDocumentFromUrl("prebuilt-document",
                        "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf"
                );


        AnalyzeResult analyzeResult = analyzeLayoutResultPoller.getFinalResult();

        // tables
        List<DocumentTable> tables = analyzeResult.getTables();
        for (int i = 0; i < tables.size(); i++) {
            DocumentTable documentTable = tables.get(i);
            System.out.printf("Table %d has %d rows and %d columns.%n", i, documentTable.getRowCount(),
                    documentTable.getColumnCount());
            documentTable.getCells().forEach(documentTableCell -> {
                System.out.printf("Cell '%s', has row index %d and column index %d.%n",
                        documentTableCell.getContent(),
                        documentTableCell.getRowIndex(), documentTableCell.getColumnIndex());
            });
            System.out.println();
        }

        // Key-value pairs
        analyzeResult.getKeyValuePairs().forEach(documentKeyValuePair -> {
            System.out.printf("Key content: %s%n", documentKeyValuePair.getKey().getContent());
            System.out.printf("Key content bounding region: %s%n",
                    documentKeyValuePair.getKey().getBoundingRegions().toString());

            if (documentKeyValuePair.getValue() != null) {
                System.out.printf("Value content: %s%n", documentKeyValuePair.getValue().getContent());
                System.out.printf("Value content bounding region: %s%n", documentKeyValuePair.getValue().getBoundingRegions().toString());
            }
        });


    }


}

