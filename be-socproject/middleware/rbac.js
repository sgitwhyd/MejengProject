const { User, Module, RoleAccess } = require('../db/models');

module.exports = (modulName, readAccess = false, writeAccess = false) => {
    return async (req, res, next) => {
        console.log(req.user)
        const { role } = req.user;
        if (!role) return res.status(401).json({ status: false, message: 'your role is undefined', data: null });

        // get role data
        const roleDB = await User.findOne({ where: { role: role } });
        if (!roleDB) return res.status(401).json({ status: false, message: 'your role data is undefined!', data: null });

        // get role modul
        const modul = await Module.findOne({ where: { name: modulName } });
        if (!modul) return res.status(401).json({ status: false, message: 'your modul is undefined', data: null });

        // get role access data
        const roleAcces = await RoleAccess.findOne({ where: { user_id: roleDB.id, module_id: modul.id } });
        if (!roleAcces) return res.status(401).json({ status: false, message: 'your acces is denied', data: null });

        console.log('rbac read :', readAccess);
        console.log('user read :', roleAcces.read);
        
        console.log('rbac write :', writeAccess);
        console.log('user write :', roleAcces.write);

        if (readAccess && !roleAcces.read) {
            return res.status(401).json({ status: false, message: 'you\'re not Admin!', data: null });
        }

        if (writeAccess && !roleAcces.write) {
            return res.status(401).json({ status: false, message: 'you\'re not Admin!', data: null });
        }

        next();
    };

};