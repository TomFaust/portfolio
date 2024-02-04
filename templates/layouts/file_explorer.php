<div class="window displayWindow">
    <div class="title-bar">
        <div class="title-bar-text">
            <img class="title-bar-icon" src="assets/icons/directory_open_cool-0.png">
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
            <div class="item op05">File</div>
            <div class="item op05">Edit</div>
            <div class="item op05">View</div>
            <div class="item op05">Go</div>
            <div class="item op05">Favorites</div>
            <div class="item op05">Tools</div>
            <div class="item op05">Help</div>
        </div>
        <hr>
        <div class="options overflow-hidden">
            <pre class="v-line-out"></pre>

            <div class="toolbar-button-wrapper">
                <div class="toolbar-button op05">
                    <div class="icon"></div>
                    <span class="label-text">Back</span>
                </div>
                <div class="svg-wrapper">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle">
                        <path style="transform:rotate(90deg);transform-origin:center" d="m6 4 4 4-4 4z">
                        </path>
                    </svg>
                </div>
            </div>

            <div class="toolbar-button-wrapper">
                <div class="toolbar-button op05">
                    <div class="icon" style="background-position: -20px 0px"></div>
                    <span class="label-text">Foreward</span>
                </div>
                <div class="svg-wrapper">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle">
                        <path style="transform:rotate(90deg);transform-origin:center" d="m6 4 4 4-4 4z">
                        </path>
                    </svg>
                </div>
            </div>

            <div class="toolbar-button-wrapper">
                <div class="toolbar-button">
                    <div class="icon" style="background-position: -880px 0px"></div>
                    <span class="label-text">Up</span>
                </div>
            </div>

            <pre class="v-line-in-small"></pre>

            <div class="toolbar-button-wrapper">
                <div class="toolbar-button ">
                    <div class="icon" style="background-position: -420px 0px"></div>
                    <span class="label-text">Cut</span>
                </div>
            </div>

            <div class="toolbar-button-wrapper">
                <div class="toolbar-button ">
                    <div class="icon" style="background-position: -440px 0px"></div>
                    <span class="label-text">Copy</span>
                </div>
            </div>

            <div class="toolbar-button-wrapper">
                <div class="toolbar-button ">
                    <div class="icon" style="background-position: -460px 0px"></div>
                    <span class="label-text">Paste</span>
                </div>
            </div>

            
            <pre class="v-line-in-small"></pre>


            <div class="toolbar-button-wrapper">
                <div class="toolbar-button ">
                    <div class="icon" style="background-position: -480px 0px"></div>
                    <span class="label-text">Undo</span>
                </div>
            </div>

            
            <pre class="v-line-in-small"></pre>


            <div class="toolbar-button-wrapper">
                <div class="toolbar-button ">
                    <div class="icon" style="background-position: -520px 0px"></div>
                    <span class="label-text">Delete</span>
                </div>
            </div>

            <div class="toolbar-button-wrapper">
                <div class="toolbar-button ">
                    <div class="icon" style="background-position: -620px 0px"></div>
                    <span class="label-text">Properties</span>
                </div>
            </div>

            
            <pre class="v-line-in-small"></pre>

            <div class="toolbar-button-wrapper">
                <div class="toolbar-button ">
                    <div class="icon" style="background-position: -780px 0px"></div>
                    <span class="label-text">Views</span>
                </div>
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