package de.off217.nfcaa.startapp;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class MeinLadenLayout extends AppCompatActivity {
    TextView tv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mein_laden_layout);

        // Auth Token speichern
        Config.authToken = getIntent().getStringExtra("auth-data");

       //tv = (TextView) findViewById(R.id.helloMeinLaden);
        // Authentifizierung war erfolgreich
       //tv.setText("Einkaufen mit: " + Config.authToken);
    }
}
