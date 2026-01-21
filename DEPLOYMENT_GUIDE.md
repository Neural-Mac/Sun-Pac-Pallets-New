# Hostinger Deployment Guide (Subdomain)

**Goal:** Upload your website to the `sunpacpallets` folder in your Hostinger account.

### Step 1: Generate the Site
1. Open your terminal.
2. Run this command:
   ```bash
   npm run build
   ```
3. Wait for it to finish. A folder named `out` will be created/updated.

### Step 2: Prepare for Upload
1. Go to your project folder: `c:\Projects\Sun Pac Pallets`.
2. Find the `out` folder.
3. **Zip** the **contents** of the `out` folder.
   - *Tip: Open `out`, select all files (Ctrl+A), Right Click -> Compress to ZIP file.*
   - Name it `website.zip`.

### Step 3: Upload to "sunpacpallets"
1. Log in to your **Hostinger Control Panel** and go to **File Manager**.
2. Navigate to: **public_html** -> **sunpacpallets**.
   - *Note: Ensure this matches the folder shown in your screenshot.*
3. Delete any old files in this specific folder.
4. Drag and drop your `website.zip` into this folder.

### Step 4: Extract
1. Right-click `website.zip` inside the `sunpacpallets` folder.
2. Select **Extract**.
   - Ensure it extracts directly into the current folder (`.` or `/public_html/sunpacpallets`).
3. Delete the `website.zip` file.
4. Visit your subdomain URL (e.g., `sunpacpallets.neuralmacworks.com`).
