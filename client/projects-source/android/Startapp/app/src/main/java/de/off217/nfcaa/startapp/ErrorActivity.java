package de.off217.nfcaa.startapp;

import android.content.Intent;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class ErrorActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_error);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("plain/text");
                intent.putExtra(Intent.EXTRA_EMAIL, new String[] { "meinladen@support.email" });
                intent.putExtra(Intent.EXTRA_SUBJECT, "Support Anfrage");
                intent.putExtra(Intent.EXTRA_TEXT, "Guten Tag, ich brauche Unterstützung.");
                startActivity(Intent.createChooser(intent, ""));
            }
        });

        String err = getIntent().getStringExtra("error-message-data");
        TextView errText = (TextView) findViewById(R.id.helloErrorText);
        errText.setText("FEHLER: " + err);
    }
}
