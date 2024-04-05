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
            <div class="item "><u>F</u>ile</div>
            <div class="item "><u>E</u>dit</div>
            <div class="item "><u>V</u>iew</div>
            <div class="item "><u>T</u>ools</div>
            <div class="item "><u>H</u>elp</div>
        </div>
        <fieldset class="options">
            
            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -1300px 0px"></div>
                    <span class="label-text">New</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -620px 0px"></div>
                    <span class="label-text">Properties</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -520px 0px"></div>
                    <span class="label-text">Delete</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -1280px 0px"></div>
                    <span class="label-text">Find People</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -140px 0px"></div>
                    <span class="label-text">Print</span>
                </button>
            </div>

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="icon" style="background-position: -1260px 0px"></div>
                    <span class="label-text">Action</span>
                </button>
            </div>
    </fieldset>
    </div>
    <div class="windowArea">
    <?php
            include '../pages/' . $_POST['content'] . '.html';
        ?>
    </div>
</div>