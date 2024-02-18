<div class="window displayWindow">
    <div class="title-bar">
        <div class="title-bar-text">
            <img class="title-bar-icon" src="assets/icons/notepad-5.png"> Notepad - 
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
            <div class="item ">File</div>
            <div class="item ">Edit</div>
            <div class="item ">Search</div>
            <div class="item ">Help</div>
        </div>
    </div>
    <div class="windowArea">
    <?php
            include '../pages/' . $_POST['content'] . '.html';
        ?>
    </div>
</div>