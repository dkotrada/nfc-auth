package de.off217.nfcaa.startapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.KeyEvent;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.TextView;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class PinEingabeLayout extends AppCompatActivity {
    private String pinAsBase64 = "";
    private String pinString = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pin_eingabe_layout);

        final EditText pin = (EditText) findViewById(R.id.pin);

        // Wenn OK Button auf der Tastatur betätigt wird
        pin.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if ((event != null && (event.getKeyCode() == KeyEvent.KEYCODE_ENTER)) || (actionId == EditorInfo.IME_ACTION_DONE)) {

                    // Übernehmen des Inhalts von der vorherigen Activity(Layout)
                    String payload = Config.jwt;

                    // Pin Eingabe übernehmen
                    pinString = pin.getText().toString();

                    // https://stackoverflow.com/questions/9126567/method-not-found-using-digestutils-in-android
                    String signWith_sha256hex = new String(Hex.encodeHex(DigestUtils.sha256(pinString)));

                    // String muss für Datenaustausch mit Base64 kodiert werden
                    pinAsBase64 = Base64.encodeToString(signWith_sha256hex.getBytes(), Base64.DEFAULT);

                    // Inhalt der Karte als Payload in ein anderen JWT verpacken
                    String compactJwsToSend = Jwts.builder()
                            .setPayload(payload)
                            .signWith(SignatureAlgorithm.HS256, pinAsBase64)
                            .compact();

                    // POST Anfrage an den Provider
                    try {
                        new SendAsyncTask(PinEingabeLayout.this, compactJwsToSend)
                                //new SendAsyncTask(PinEingabeLayout.this, payload)
                                .execute(Config.url + "/auth");
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                }
                return false;
            }
        });
    }
}
