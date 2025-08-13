import React, { useEffect, useState } from 'react'
import { SidebarImport } from './Imports'
import * as Icons from 'react-icons/lu'
const { PerfectScrollbar, LuCircleDot, FavIcon, useDispatch, useSelector, Menu, Link, sidebarTodo, useNavigate, ConfigProvider } = SidebarImport

export default function SidebarLayout(props) {

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector(state => state.sidebar && state.sidebar.data)

    const { collapsed, setCollapsed } = props

    const [openKeys, setOpenKeys] = useState([]);

    const Icon = ({ name }) => {
        const IconComponent = Icons[name];

        if (!IconComponent) {
            console.error(`Icon "${name}" not found.`);
            return null;
        }

        return <IconComponent className={localStorage.getItem('lang_key') == 'ar' ? 'ms-2' : 'me-2'} style={{ marginBottom: '0.20rem' }} />;
    }

    const menu = data && data.mainMenu && data.mainMenu.map((main, index) => (
        {
            "key": index.toString(),
            "label": main.name,
            "icon": <Icon name={main.icon} />,
            "type": '',
            "children": main.subMenus && main.subMenus.map((sub, subIndex) => (
                {
                    "key": index.toString() + subIndex.toString(),
                    "label": sub.name,
                    "icon": <LuCircleDot />,
                    "type": '',
                    "children": sub.permissionMenu && sub.permissionMenu.map((permit, permitIndex) =>
                        permit && JSON.parse(permit.actionAttributes)
                            .filter(fil => fil.showInMenu == true)
                            .map((action, actIndex) =>
                            (
                                {
                                    "key": index.toString() + subIndex.toString() + permitIndex.toString() + actIndex.toString(),
                                    "label": <Link to={action.route}>{action.actionName}</Link>,
                                    "type": ''
                                }
                            )
                            )).flat()
                }
            ))
        }
    ))


    // const rootSubmenuKeys = menu && menu.map((item) => item.key)

    // const onOpenChange = (keys) => {
    //     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //         setOpenKeys(keys);
    //     } else {
    //         setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    //     }
    // }

    const sidebar_res = (res) => {
        if (res && res.status == 200) {
            const permission = res && res.data && res.data.actionAttribtes && res.data.actionAttribtes.map(val => JSON.parse(val)).flat()
            localStorage.setItem('permission', JSON.stringify(permission))
            setLoading(false)
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else {
            // setBreakLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        dispatch(sidebarTodo()).then((res) => sidebar_res(res.payload))
    }, [])

    return (
        <>
            {/* <div className={collapsed ? 'sidebar_collapsed' : 'sidebar_notCollapsed'}> */}

            {/* <div className='sidebar_header'>
                    <img src={FavIcon} className='img-fluid login_bg_max' alt="logo" />
                </div> */}

            {/* <PerfectScrollbar style={{ background: '#FFFFFF', height: '92vh' }} > */}
            <ConfigProvider direction={localStorage.getItem('lang_key') == 'ar' ? 'rtl' : 'ltr'}
                theme={{
                    components: {
                        Menu: {
                            itemPaddingInline: 12,
                            horizontalLineHeight: '40px',
                            itemHeight: 35,
                            // itemSelectedColor: '#21263c',
                            // dropdownWidth: 150
                        },
                    },
                    token: {
                        fontSize: 13,
                        fontFamily: 'Inter',
                    },
                }}
            >
                <Menu
                    mode="horizontal"
                    // inlineCollapsed={collapsed}
                    // theme="light"
                    style={{ background: '#FFFFFF', width: '100%', marginTop: '40px' }}
                    // openKeys={openKeys}
                    // onOpenChange={onOpenChange}
                    items={loading ? [{}] : menu}
                />
            </ConfigProvider>
            {/* </PerfectScrollbar> */}
            {/* </div> */}

        </>
    )
}
