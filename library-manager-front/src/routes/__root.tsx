import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { Container } from '../components/containers'
import { MainHeader } from '../components/header/index'
import { QueryClient } from '@tanstack/react-query'
import { Footer } from '../components/footer'

type RootContext = {
    queryClient: QueryClient;
    role: string;
    first_name: string;
    last_name: string;
    email: string;
}

export const Route = createRootRouteWithContext<RootContext>()({
    component: RootComponent,
});



function RootComponent() {

    return (
        <Container>
            <MainHeader />
            <Outlet />
            <Footer />
        </Container>
    )
}
