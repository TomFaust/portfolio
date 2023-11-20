<div class="window displayWindow">
    <div class="title-bar">
        <div class="title-bar-text">
            <img class="title-bar-icon" src="assets/icons/internet_explorer.png">
        </div>
        <div class="title-bar-controls">
            <button class="controls-minimize pointer" aria-label="Minimize">
            </button>
            <button class="controls-close pointer" aria-label="Close">
            </button>
        </div>
    </div>
    <div class="window-options">
        <div class="options">
            <pre class="v-line-out"></pre>
            <div class="item op05">File</div>
            <div class="item op05">Edit</div>
            <div class="item op05">Views</div>
            <div class="item op05">Favorites</div>
            <div class="item op05">Tools</div>
            <div class="item op05">Help</div>
            <div class=" float-right">
                <img class="browser-bar-image" src="assets/icons/internet_explorer_icon.png">
            </div>
        </div>
        <hr>
        <div class="options">
            <pre class="v-line-out"></pre>
            <div class="item">Address</div>
            <select class="address_select pointer">
            </select>
        </div>
    </div>
    <div class="windowArea">
        <?php
            include '../pages/' . $_POST['content'] . '.html';
        ?>
    </div>
    
    <script src="src/js/browser_windows.js"></script>
</div>