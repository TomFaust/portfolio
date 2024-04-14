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
        <div class="options fieldset">
            
            <div class="toolbar-button-wrapper">
                <button class="toolbar-button" disabled>
                    <div class="iconWithArrow">
                        <div class="icon" style="background-position: -1300px 0px"></div>
                        <svg width="12" height="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle">
                            <path style="transform:rotate(90deg);transform-origin:center" d="m6 4 4 4-4 4z">
                            </path>
                        </svg>
                    </div>
                    
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
                <div class="iconWithArrow">
                    <div class="icon" style="background-position: -1260px 0px"></div>
                        <svg width="12" height="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle">
                            <path style="transform:rotate(90deg);transform-origin:center" d="m6 4 4 4-4 4z">
                            </path>
                        </svg>
                    </div>
                    <span class="label-text">Action</span>
                </button>
            </div>
        </div>
    </div>
    <div class="windowArea">
    <!-- <?php
            include '../pages/' . $_GET['content'] . '.html';
        ?> -->
        <div id="contantGroups">
    <ul class="tree-view">
        <li>
          <details open>
            <summary>
                <img src="assets/icons/window/open_folder.png">
                Contacts
            </summary>
            <ul>
              <li class="contantGroup pointer"><img src="assets/icons/desktop/social_media.png">Social Media</li>
              <li class="contantGroup pointer"><img src="assets/icons/network_cool_two_pcs-0.png">Direct</li>
            </ul>
          </details>
        </li>
      </ul>
</div>

<div class="contactList">
    <div class="searchInput">
        <div class="field-row">
            <label for="searchContacts">Type name or select from list:</label>
            <input id="searchContacts" type="text" />
          </div>
    </div>

    <div id="social" class="sunken-panel contacts">
        <table class="interactive">
          <thead>
            <tr>
              <th>Name</th>
              <th>Link</th>
              <th>Quick response?</th>
            </tr>
          </thead>
          <tbody class="list">
            <tr >
              <td class="name">Facebook</td>
              <td class="link"><span onclick="window.open('https://www.facebook.com/tom.faust.1656/')">https://www.facebook.com/tom.faust.1656/</span></td>
              <td class="quick">No</td>
            </tr>
            <tr>
                <td class="name">Instagram</td>
                <td class="link"><span onclick="window.open('https://www.instagram.com/tom_sage_faust/')">https://www.instagram.com/tom_sage_faust/</span></td>
                <td class="quick">No</td>
            </tr>
            <tr>
                <td class="name">LinkedIn</td>
                <td class="link"><span onclick="window.open('https://www.linkedin.com/in/tom-faust-66516ba6/')">https://www.linkedin.com/in/tom-faust-66516ba6/</span></td>
                <td class="quick">No</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="direct" class="sunken-panel contacts">
        <table class="interactive">
          <thead>
            <tr>
              <th>Name</th>
              <th>Link</th>
              <th>Quick response?</th>
            </tr>
          </thead>
          <tbody class="list">
            <tr>
              <td class="name">Email</td>
              <td class="link"><span onclick="window.open('mailto:tom.faust@hotmail.com')">tom.faust@hotmail.com</span></td>
              <td class="quick">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
</div>
    </div>
</div>