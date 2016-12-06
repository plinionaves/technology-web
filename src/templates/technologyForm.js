exports.render = () => {

    return `<form>
                <div class="list">
                    <label class="item item-input item-stacked-label">
                        <span class="input-label">Tecnologia</span>
                        <input type="text" data-technology>
                    </label>
                    <label class="item item-input item-stacked-label">
                        <span class="input-label">Nota</span>
                        <input type="text" data-note>
                    </label>
                </div>
                <div class="padding">
                    <button class="button button-positive button-block">
                        <i class="ion-compose"></i> Salvar
                    </button>
                </div>
            </form>`;

};