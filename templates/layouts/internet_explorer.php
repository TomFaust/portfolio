<div class="window displayWindow">
    <div class="title-bar">
        <div class="title-bar-text">
            <img class="title-bar-icon" src="assets/icons/internet_explorer.png">
        </div>
        <div class="title-bar-controls">
            <button class="controls-minimize pointer" aria-label="Minimize">
            </button>
            <button class="controls-maximize pointer" aria-label="Maximize">
            </button>
            <button class="controls-close pointer" aria-label="Close">
            </button>
        </div>
    </div>
    <div class="window-options">
        
        <div class="options">
            <pre class="v-line-out"></pre>
            <div class="item ">File</div>
            <div class="item ">Edit</div>
            <div class="item ">View</div>
            <div class="item ">Go</div>
            <div class="item ">Favorites</div>
            <div class="item ">Tools</div>
            <div class="item ">Help</div>
            <div class=" float-right">
                <img class="browser-bar-image" src="assets/icons/internet_explorer_icon.png">
            </div>
        </div>
        <hr>
        <div class="options overflow-hidden">
            <pre class="v-line-out"></pre>

            <div class="toolbar-button-wrapper backward">
                <button class="toolbar-button" disabled>
                    <div class="icon"></div>
                    <span class="label-text">Back</span>
                </button>
                <div class="svg-wrapper">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle">
                        <path style="transform:rotate(90deg);transform-origin:center" d="m6 4 4 4-4 4z">
                        </path>
                    </svg>
                </div>
            </div>

            <div class="toolbar-button-wrapper forward">
                <button class="toolbar-button " disabled>
                    <div class="icon" style="background-position: -20px 0px"></div>
                    <span class="label-text">Forward</span>
                </button>
                <div class="svg-wrapper">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle">
                        <path style="transform:rotate(90deg);transform-origin:center" d="m6 4 4 4-4 4z">
                        </path>
                    </svg>
                </div>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button">
                    <div class="icon" style="background-position: -40px 0px"></div>
                    <span class="label-text">Stop</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button ">
                    <div class="icon" style="background-position: -60px 0px"></div>
                    <span class="label-text">Refresh</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button ">
                    <div class="icon" style="background-position: -80px 0px"></div>
                    <span class="label-text">Home</span>
                </button>
            </div>

            <pre class="v-line-in-small"></pre>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button ">
                    <div class="icon" style="background-position: -100px 0px"></div>
                    <span class="label-text">Search</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button ">
                    <div class="icon" style="background-position: -120px 0px"></div>
                    <span class="label-text">Favorites</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button ">
                    <div class="icon" style="background-position: -140px 0px"></div>
                    <span class="label-text">History</span>
                </button>
            </div>

            <pre class="v-line-in-small"></pre>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button ">
                    <div class="icon" style="background-position: -240px 0px"></div>
                    <span class="label-text">Print</span>
                </button>
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

    <div class="infoArea">
        <pre></pre>
        <pre></pre>
        <pre>
            <img src="assets/icons/world-0.png">
            <span>Internet</span>
        </pre>
    </div>
    
    <script src="src/js/browser_windows.js"></script>
</div>