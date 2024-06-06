import { appRoutes } from '@/shared/routes'

export const routes = [
    { ...appRoutes.home, component: () => import('@/pages/home-page') },
    { ...appRoutes.form, component: () => import('@/pages/form-page') },
    { ...appRoutes.export, component: () => import('@/pages/export-page') }
]
