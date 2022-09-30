// import app from '@/app.vue'

const routes = [
  {
    path: '/',
    redirect: '/test',
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test'),
    meta: {
      title: 'test',
      isMenu: true
    },
  }
]

export default routes
