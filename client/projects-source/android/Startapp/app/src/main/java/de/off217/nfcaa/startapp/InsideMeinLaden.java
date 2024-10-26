package de.off217.nfcaa.startapp;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.TextView;

public class InsideMeinLaden extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inside_mein_laden);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Auth Token speichern
        Config.authToken = getIntent().getStringExtra("auth-data");
        TextView tv = (TextView) findViewById(R.id.textView_insideMeinLaden);
        // Authentifizierung war erfolgreich
        tv.setText("Einkaufen mit: " + Config.authToken);
    }

}
