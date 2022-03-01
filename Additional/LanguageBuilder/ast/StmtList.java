package ast;
import java.util.HashMap;

public class StmtList extends Stmt {
    
    final Stmt stmt;
    final StmtList stmtList;

    public StmtList(Stmt stmt, StmtList stmtList, Location loc) {
        super(loc);
        this.stmt = stmt;
        this.stmtList = stmtList;
    }

    //Object eval(HashMap<String,Object> env);
    public Object exec(HashMap<String,Object> env){
        Object result = stmt.exec(env);
        if (result != null){
            return stmt.exec(env);
        }else if(stmtList != null){
            return stmtList.exec(env);
        }else{
            return null;
        }
    }
}

