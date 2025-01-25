import { createFileRoute } from '@tanstack/react-router'
import '../index.scss'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="main">
            <h1>This is simply: <div className="roller">
                <span id="rolltext">Pawel's Library<br />
                    <span style={{ textTransform: 'lowercase' }}>a library</span><br />
                    <span style={{ textTransform: 'lowercase' }}>manager</span><br />
                </span>
            </div>
            </h1>

        </div>
    )
}
