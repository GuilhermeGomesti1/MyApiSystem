import CreateTaskForm from "@/components/createTaskForm/CreateTaskForm"
import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"

export default function Tasks() {
    return( <> <Header/>
        <div>
            <CreateTaskForm/>
        </div>
        <Footer/>
        </>
    )
}