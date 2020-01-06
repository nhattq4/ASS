const paggingParse = (req, res, next) => {
    let { page, limit, order } = req.body;

    page = Number(page);
    limit = Number(limit);
    const maxlimit = Number(process.env.MAX_PAGE_SIZE);
    const defaultlimit = Number(process.env.DEFAULT_PAGE_SIZE) || 20;

    if (!Number.isInteger(page) || page < 1) {
        page = 1;
    }

    if (!Number.isInteger(page) && maxlimit & (page > maxlimit)) {
        limit = maxlimit;
    } else if (!Number.isInteger(limit)) {
        limit = defaultlimit;
    }

    if (Array.isArray(order)) {
        order = order.reduce((orders, order) => {
            if (order.columnName && order.direction) {
                orders.push([order.columnName, order.direction]);
                return orders;
            }
        }, []);
    } else {
        order = undefined;
    }

    const offset = (page - 1) * limit;
    limit = offset + limit;
    const pagination = {
        offset,
        limit
    };

    req.body = {
        ...req.body,
        page,
        limit,
        pagination,
        order
    };
    next();
};

const registerMiddleware = app => {
    app.use(paggingParse);
};

module.exports = {
    name: 'PagingParser',
    register: registerMiddleware
};


