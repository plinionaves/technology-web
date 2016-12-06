const renderTechnologies = technologies => {

    return technologies.map(technology => {

            let done = technology.done ? 'ios-checkmark' : 'ios-circle-outline';

            return `<li class="item item-button-right">
                        ${technology.name} ${(technology.note ? ' - ' + technology.note : '')}
                        <button data-remove data-technology-id="${technology.id}" class="button button-assertive">
                            <i class="ion-trash-a"></i>
                        </button>
                    </li>`;

        }).join('');

};

exports.render = technologies => {
    if (technologies && technologies.length) {
        return `<ul class="list">${renderTechnologies(technologies)}</ul>`;
    }
    return `<h4 class="text-center">Nenhuma tecnologia ainda</h4>`;
};