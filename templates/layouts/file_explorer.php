<div class="window displayWindow">
    <div class="title-bar">
        <div class="title-bar-text">
            <img class="title-bar-icon">
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
    <div class="window-options border">
 
        <div class="options">
            <pre class="v-line-out"></pre>
            <div class="item "><u>F</u>ile</div>
            <div class="item "><u>E</u>dit</div>
            <div class="item "><u>V</u>iew</div>
            <div class="item "><u>G</u>o</div>
            <div class="item "><u>F</u>avorites</div>
            <div class="item "><u>T</u>ools</div>
            <div class="item "><u>H</u>elp</div>
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
                <button class="toolbar-button" disabled>
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
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -880px 0px"></div>
                    <span class="label-text">Up</span>
                </button>
            </div>

            <pre class="v-line-in-small"></pre>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -420px 0px"></div>
                    <span class="label-text">Cut</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button " disabled>
                    <div class="icon" style="background-position: -440px 0px"></div>
                    <span class="label-text">Copy</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button " disabled>
                    <div class="icon" style="background-position: -460px 0px"></div>
                    <span class="label-text">Paste</span>
                </button>
            </div>

            
            <pre class="v-line-in-small"></pre>


            <div class="toolbar-button-wrapper">
                <button class="toolbar-button " disabled>
                    <div class="icon" style="background-position: -480px 0px"></div>
                    <span class="label-text">Undo</span>
                </button>
            </div>

            
            <pre class="v-line-in-small"></pre>


            <div class="toolbar-button-wrapper">
                <button class="toolbar-button " disabled>
                    <div class="icon" style="background-position: -520px 0px"></div>
                    <span class="label-text">Delete</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button " disabled>
                    <div class="icon" style="background-position: -620px 0px"></div>
                    <span class="label-text">Properties</span>
                </button>
            </div>

            
            <pre class="v-line-in-small"></pre>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button " disabled>
                    <div class="icon" style="background-position: -780px 0px"></div>
                    <span class="label-text">Views</span>
                </button>
            </div>


        </div>
        <hr>
        <div class="options">
            <pre class="v-line-out"></pre>
            <div class="item">Address</div>
            <select class="address_select pointer" disabled>
            </select>
        </div>
    </div>
    <div class="windowArea">
        <?php
            include '../pages/' . $_POST['content'] . '.html';
        ?>
    </div>

    <div class="infoArea">
        <pre><span>3 object(s)</span></pre>
        <pre></pre>
        <pre>
            <img src="assets/icons/computer_explorer-2.png">
            <span>My computer</span>
        </pre>
    </div>
</div>