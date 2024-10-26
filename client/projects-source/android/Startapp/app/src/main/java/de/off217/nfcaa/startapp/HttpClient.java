package de.off217.nfcaa.startapp;

import android.util.Log;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import static java.net.HttpURLConnection.HTTP_OK;

public class HttpClient {

    private String urlStr;
    private StringBuffer responseBuff;
    private JSONObject jsonData;

    // Konstruktor
    HttpClient(String u) {
        urlStr = u;
    }

    public String getResponseBuff() {
        return responseBuff.toString();
    }

    // HTTP POST request ****************************************************************
    String sendPost(JSONObject postData) throws Exception {

        try {
            // REQUEST BEREICH ==========================================
            HttpURLConnection connection = (HttpURLConnection) new URL(urlStr).openConnection();

            // optional default is POST
            connection.setRequestMethod("POST");

            // Timeout auf 3 Sekunden
            connection.setConnectTimeout(3000);

            //set the sending type to json
            connection.setRequestProperty("Content-Type", "application/json");

            //  add request header
            String USER_AGENT = "Mozilla/5.0";
            connection.setRequestProperty("User-Agent", USER_AGENT);

            if (postData != null) {
                //set the content length of the body
                connection.setRequestProperty("Content-length", postData.toString().getBytes().length + "");

                //send as body of the request
                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(postData.toString().getBytes("UTF-8"));
                outputStream.flush();
                outputStream.close();
            }

            // RESPONSE BEREICH ==========================================
            // Antwort zwischenspeichern
            int responseCode = connection.getResponseCode();
            BufferedReader buffReadIn = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            responseBuff = new StringBuffer();

            String inputLine;
            while ((inputLine = buffReadIn.readLine()) != null) {
                responseBuff.append(inputLine);
            }
            buffReadIn.close();

            if (responseCode == HTTP_OK){
                return responseBuff.toString();
            } else {
                return null;
            }

        } catch (java.net.SocketTimeoutException e) {
            return "" + e;
        } catch (java.io.IOException e) {
            e.printStackTrace();
            return "" + e;
        }
    }
}
