<div class="window displayWindow">
    <div class="title-bar">
        <div class="title-bar-text">
            
        </div>
        <div class="title-bar-controls">
            <button class="controls-minimize" aria-label="Minimize">
            </button>
            <button class="controls-close" aria-label="Close">
            </button>
        </div>
    </div>
    <div class="windowArea">
    <?php
            include '../pages/' . $_POST['content'] . '.html';
        ?>
    </div>
</div>