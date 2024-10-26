package de.off217.nfcaa.startapp;

import android.content.Intent;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SendAsyncTask extends AsyncTask<String, String, String> {
    private PinEingabeLayout pinContext;
    private JSONObject jsonData;

    SendAsyncTask(PinEingabeLayout context, String inhaltDerKarte) {
        this.pinContext = context;

        jsonData = new JSONObject();
        try {
            // Inhalt der Karte wird für den Provider vorbereitet
            jsonData.put("cardContent", inhaltDerKarte);
        } catch (JSONException ex) {
            ex.printStackTrace();
        }
    }

    // HTTP Request an den Provider abschicken
    protected String doInBackground(String... urls) {
        HttpClient requester = new HttpClient(urls[0]);
        try {
            // Inhalt der Karte wird an den Provider gesendet
            return requester.sendPost(jsonData);
        } catch (Exception ex) {
            return ex.getLocalizedMessage();
        }
    }

    // Variable result wird von der SendAsyncTask geschriben
    // Und kann ausgewertet werden
    @Override
    protected void onPostExecute(String result) {
        if (result != null) {

            JSONObject jsonObj;
            String status = "init";
            String payload = "init";
            try {
                jsonObj = new JSONObject(result);
                status = jsonObj.get("status").toString();
                payload = jsonObj.get("payload").toString();
            } catch (JSONException e) {
                e.printStackTrace();
            }

            Intent goError;
            String message;

            switch (status) {

                case "200":
                    Intent goMeinLaden = new Intent(pinContext, InsideMeinLaden.class);
                    goMeinLaden.putExtra("auth-data", payload); //parameter übergabe
                    pinContext.startActivity(goMeinLaden);
                    break;

                case "404":
                    goError = new Intent(pinContext, ErrorActivity.class);
                    goError.putExtra("error-message-data", payload);
                    pinContext.startActivity(goError);
                    break;

                case "606":
                    goError = new Intent(pinContext, ErrorActivity.class);
                    goError.putExtra("error-message-data", payload);
                    pinContext.startActivity(goError);
                    break;

                case "707":
                    goError = new Intent(pinContext, ErrorActivity.class);
                    goError.putExtra("error-message-data", payload);
                    pinContext.startActivity(goError);
                    break;

                case "808":
                    goError = new Intent(pinContext, ErrorActivity.class);
                    goError.putExtra("error-message-data", payload);
                    pinContext.startActivity(goError);
                    break;

/*
                case "558":
                    goError = new Intent(pinContext, ErrorActivity.class);
                    goError.putExtra("error-message-data", payload);
                    pinContext.startActivity(goError);
                    break;
*/
                default:
                    goError = new Intent(pinContext, ErrorActivity.class);
                    message = "Allgemeiner Fehler!";
                    goError.putExtra("error-message-data", message);
                    pinContext.startActivity(goError);
                    break;
            }
        }
    }
}