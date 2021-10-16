vim node_modules/react-native-audio/android/build.gradle
# find 47 change to 1.1.0
implementation "androidx.appcompat:appcompat:1.1.0"


作者GitHub更新4.3.1，虽然作者修改了gradle文件，但是AudioRecorderManager文件还是有问题，需要手动修改。
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
手动修改一下：
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;