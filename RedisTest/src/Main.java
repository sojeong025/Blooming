import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class Main {
    public static void main(String[] args) {


        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");
        System.out.println(timestamp);
        System.out.println(sdf.format(timestamp));
        System.out.println(Long.valueOf(sdf.format(timestamp)));
    }
}