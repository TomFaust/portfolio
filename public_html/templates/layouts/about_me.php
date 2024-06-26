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
    <div class="window-options">
        <div class="options">
            
            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -400px 0px"></div>
                    <span class="label-text">Hide</span>
                </button>
            </div>


            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: 0px 0px"></div>
                    <span class="label-text">Back</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -20px 0px"></div>
                    <span class="label-text">Forward</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="iconWithArrow">
                        <div class="icon" style="background-position: -620px 0px"></div>
                        <svg width="12" height="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle">
                            <path style="transform:rotate(90deg);transform-origin:center" d="m6 4 4 4-4 4z">
                            </path>
                        </svg>
                    </div>
                    
                    <span class="label-text">Options</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -1320px 0px"></div>
                    <span class="label-text">Web help</span>
                </button>
            </div>

        </div>
    </div>
    <div class="windowArea">
    <?php
            include '../pages/' . $_GET['content'] . '.html';
        ?>
    </div>
</div>