
import {ProjectDto} from "@dtos/project.dto";



class ProjectService{
    

    /*
    * inviteContributor
    * @params ProjectDto
    * @return ProjectModel
    * */
    public async save(project:ProjectDto){
        return "not implemented"
    };

    /*
    * find all projects
    * @return projectModel[]
    * */
    public async getAll(){
        
        return "not implemented"
    }

    /*
    * inviteContributor
    * @params (email, projectId)
    * @return projectMemberModel
    * */
    public async inviteContributor(email:string, projectId:string){
        return "not implemented"
    }


    /*
   * invite project manager to a project
   * @params (email, projectId)
   * @return projectMemberModel
   */
    public async invitePM(email:string, projectId:string){
        return "not implemented"
    }

    public async suspendProject(projectId:string){
        return "not implemented"
    }

}

export default  ProjectService;
