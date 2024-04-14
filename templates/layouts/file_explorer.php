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

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button backward" disabled>
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

            <div class="toolbar-button-wrapper">
                <button class="toolbar-button forward" disabled>
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
        <!-- <?php
            include '../pages/' . $_GET['content'] . '.html';
        ?> -->
        <div class="pre">
    <div class="pre_inset fileExplorerGrid">
        <div class="fileInfoPanel">
            <img src="assets/icons/window/open_folder.png">
            <p>Past work</p>
            <div class="rainbowLine">
                <div class="red"></div>
                <div class="orange"></div>
                <div class="green"></div>
                <div class="blue"></div>
            </div>
            <div></div>
        </div>

        <div class="folderPanel" data-subject="main">
            <div class="folderIcon clickableIcon pointer" data-panel="personal_projects">
                <img src="assets/icons/browser/directory_closed.png">
                <label class="pointer">Personal Projects</label>
            </div>
            <div class="folderIcon clickableIcon pointer" data-panel="study_projects">
                <img src="assets/icons/browser/directory_closed.png">
                <label class="pointer">Study projects</label>
            </div>
            <div class="folderIcon clickableIcon pointer" data-panel="work_+_internships">
                <img src="assets/icons/browser/directory_closed.png">
                <label class="pointer">Work + Internships</label>
            </div>
        </div>

        <div class="folderPanel d-none" data-subject="personal_projects">
            <div class="folderIcon openingIcon"  data-url="/">
                <img src="assets/icons/windows-0.png">
                <label class="pointer">Portfolio</label>
            </div>
        </div>

        <div class="folderPanel d-none" data-subject="study_projects">
            <div class="folderIcon openingIcon" data-url="https://gamesbumblebee.itch.io/oh-bees">
                <img src="assets/icons/browser/oh!bees.png">
                <label class="pointer">Oh Bees!</label>
            </div>
            <div class="folderIcon openingIcon" data-url="https://store.steampowered.com/app/2236880/I_Wont_Forget_Hue/">
                <img src="assets/icons/browser/i_wont_forget_hue.png">
                <label class="pointer">I Won't Forget Hue</label>
            </div>
            <div class="folderIcon openingIcon" data-url="https://joelheezen.github.io/unicorn-game/">
                <img src="assets/icons/browser/unicorn_gun.png">
                <label class="pointer">Tactical Unicorn</label>
            </div>
            <div class="folderIcon openingIcon" data-url="https://joelheezen.github.io/introductiegame/">
                <img src="assets/icons/browser/intro.png">
                <label class="pointer">Introduction Game</label>
            </div>
        </div>

        <div class="folderPanel d-none" data-subject="work_+_internships">
            <div class="folderIcon openingIcon" data-url="https://www.facebook.com/ITBrug/">
                <img src="assets/icons/browser/smartcirculair_challenge_logo.jfif">
                <label class="pointer">IT_Brug</label>
            </div>
            <div class="folderIcon openingIcon" data-url="https://nl.linkedin.com/company/chef-marketing">
                <img src="assets/icons/browser/chef_marketing_logo.jfif">
                <label class="pointer">Chef marketing</label>
            </div>
            <div class="folderIcon openingIcon" data-url="https://www.pixeldeluxe.nl">
                <img src="assets/icons/browser/pixeldeluxe.png">
                <label class="pointer">Pixeldeluxe</label>
            </div>
            <div class="folderIcon openingIcon" data-url="https://en.viona.nl">
                <img src="assets/icons/browser/viona.png">
                <label class="pointer">VionA</label>
            </div>
        </div>
    </div>
</div>
    </div>
    <div class="status-bar">
        <p class="status-bar-field">3 object(s)</p>
        <p class="status-bar-field"></p>
        <span class="status-bar-field"> 
            <span class="grid">
                <img src="assets/icons/computer_explorer-2.png">
                <span>My computer</span>
            </div>
        </span>
    </div>
</div>