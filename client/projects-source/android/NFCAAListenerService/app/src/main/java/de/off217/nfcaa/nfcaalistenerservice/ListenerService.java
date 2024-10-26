package de.off217.nfcaa.nfcaalistenerservice;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

/**
 * Created by alfa on 26.09.17.
 */

public class ListenerService extends Service {

    private static final String MSG = "MELDUNG:";

    private boolean isRunning = false;

    // Diese Methode wird nur ein Mal aufgerufen, wenn das Service startet.
    @Override
    public void onCreate(){
        Log.i(MSG, "Methode onCreate() aufgerufen.");

        isRunning = true;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startID){
        Log.i(MSG, "Methode onStartCommand() aufgerufen.");

        // Neuen Thread für Listener Service erstellen
        new Thread(new Runnable() {
            @Override
            public void run() {
                while(true){
                    try{
                        Thread.sleep(1000);
                        Log.i(MSG, "Ich bin am Leben");
                    } catch (Exception e) {
                        Log.i(e.toString(), "Listener Service wird beendet");
                        onDestroy();
                    }
                }
            }
        }).start();

        // Sollte der Service von Android mangels Speichers beendet werden
        // starte ihn automatisch neu wenn wieder Speicher verfügbar ist.
        // onStartCommand() wird dann neu aufgerufen.
        return Service.START_STICKY;
    }

    @Override
    public IBinder onBind(Intent arg0) {
        Log.i(MSG, "Listener Service onBind() aufgerufen");
        return null;
    }

    @Override
    public void onDestroy() {
        isRunning = false;
        Log.i(MSG, "Listener Service onDestroy() aufgerufen");
    }
}
