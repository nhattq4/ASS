const Sequelize = require('sequelize');
const Op = Sequelize.Op;

generateFilterQuery = arrayfilter => {
    let arrrayResult = [];

    if (Array.isArray(arrayfilter) && arrayfilter.length) {
        arrayfilter.forEach(filter => {
            if (Array.isArray(filter.text) && filter.text.length) {
                filter.text.forEach(text => {
                    arrrayResult.push({
                        [filter.colId]: {
                            [Op.like]: `%${text}%`
                        }
                    });
                });
            } else {
                arrrayResult.push({
                    [filter.colId]: {
                        [Op.like]: `%${filter.text}%`
                    }
                });
            }
        });
    }
    return arrrayResult;
}

generateSearchQuery = arraySearch => {
    let arrrayResult = [];

    if (Array.isArray(arraySearch) && arraySearch.length) {
        arraySearch.forEach(filter => {
            if (Array.isArray(filter.text) && filter.text.length) {
                filter.text.forEach(text => {
                    arrrayResult.push({
                        [filter.colId]: {
                            [Op.like]: `%${text}%`
                        }
                    });
                });
            } else {
                arrrayResult.push({
                    [filter.colId]: {
                        [Op.like]: `%${filter.text}%`
                    }
                });
            }
        });
    }
    return arrrayResult;
}

module.exports = {
    generateFilterQuery,
    generateSearchQuery
};
