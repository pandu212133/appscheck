# How to Build Your Android APK

Since you don't have Android Studio installed locally, I have configured this project to build the APK automatically using **GitHub Actions**.

## Steps to Get Your APK

1. **Create a Repository on GitHub**:
   - Go to [GitHub.com/new](https://github.com/new) and name it `time-management-app`.
   - Do NOT initialize with a README/gitignore (we already have them).

2. **Push this Code**:
   Open a terminal in this folder (`/Users/sateeshkumarpittala/Desktop/apps/time-management-app`) and run:
   
   ```bash
   git remote add origin https://github.com/pandu212133/appscheck.git
   git branch -M main
   git push -u origin main
   ```

3. **Download the APK**:
   - Go to your repository on GitHub.
   - Click on the **"Actions"** tab.
   - Click on the **"Build Android APK"** workflow run.
   - Once it completes (green checkmark), scroll down to the **"Artifacts"** section.
   - Click **"app-debug"** to download the zip file containing your APK.

## Local Build (Optional)
If you install Android Studio later:
1. Open Android Studio.
2. Select "Open" and choose the `android` folder inside this project.
3. Wait for Gradle sync to finish.
4. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
