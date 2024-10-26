# Services

## Service
- runs in background
- not bound to lifecycle of an activity
- runs with a higher priority
- can be confirmed to be restarted if android terminate them
- can be same priorized like foreground activity (like play music service)

## Background processing
- create and run a new Thread in the service
- if service run in the process of the application. it is local service


## Platform service and custum services
- default services can be used by every android application.
  - access it with `getSystemService()`
  - The `Context` class defines constants for accessing these services

- your application can define and use new services
- custom services are started from other components i.e., activities, other services


## Foreground Services
- it schould have the same priority as an active activity
- must provide a notification for the status bar
~~~.java
Notification notification = new Notification(R.drawable.icon, getText(R.string.ticker_text), System.currentTimeMillis());

Intent notificationIntent = new Intent(this, ExampleActivity.class);

PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent,0);

notification.setLatestEventInfo(this, getText(R.string.notification_title), getText(R.string.notification_message), pendingIntent);

startForeground(ONGOING_NOTIFICATION_ID, notification);
~~~


## Defining custom services

### Implementing and declaration
- service needs to be declared in `AndroidManifest.xml`
- implementing class must extend the `Service` or on of it subclasses

Service declaration
~~~.xml
<service
    android:name="MyService"
    android:icon="@drawable/icon"
    android:label="@string/service_name"
    >
</service>
~~~

Service implementation
~~~.java
public class MyService extends Service {

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
      //TODO do something useful
      return Service.START_NOT_STICKY;
  }

  @Override
  public IBinder onBind(Intent intent) {
    //TODO for communication return IBinder implementation
    return null;
  }
}
~~~

### Start a service
- components `(service, receiver, activity)` can trigger the execution of service
- use `startService(intent)` method
~~~.java
// use this to start and trigger a service
Intent i= new Intent(context, MyService.class);
// potentially add data to the intent
i.putExtra("KEY1", "Value to be used by the service");
context.startService(i);
~~~
- alternatively start service with `bindService()` to communicate with it directly

### Service start process and execution
1. startService(intent) called
2. service is not yet running -> then onCreate() is called
3. when service is started -> then onStartCommand(intent) is called

1. if startService(intent) is called while service is running
2. onStartCommand() will be called
Prepare your service that onStartCommand() can be called several times
- onStartCommand() Android system automatically synchronize calls of this method
- service is only started once even when you call startService() several times

### Service restart behavior
