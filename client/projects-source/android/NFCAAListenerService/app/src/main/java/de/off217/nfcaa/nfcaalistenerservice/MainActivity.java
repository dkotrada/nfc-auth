package de.off217.nfcaa.nfcaalistenerservice;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Es wird kein layout Gesetzt
        // setContentView(R.layout.layout_main);
        Intent intent = new Intent(MainActivity.this, ListenerService.class);
        startService(intent);
    }
}
