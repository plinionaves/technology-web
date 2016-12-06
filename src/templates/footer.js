exports.render = path => {

    let isTechnologies = path === "technologies" ? "active" : "";
    let isTechnologyForm = path === "technologyForm" ? "active" : "";
    let isUser = path === "user" ? "active" : "";

    return `
        <div class="tabs-striped tabs-color-calm">
            <div class="tabs">
                <a data-path="technologies" class="tab-item ${isTechnologies}">
                    <i class="icon ion-home"></i>
                </a>
                <a data-path="technologyForm" class="tab-item ${isTechnologyForm}">
                    <i class="icon ion-compose"></i>
                </a>
                <a data-path="user" class="tab-item ${isUser}">
                    <i class="icon ion-person"></i>
                </a>
                <a data-logout class="tab-item">
                    <i class="icon ion-android-exit"></i>
                </a>
            </div>
        </div>`;

};