package ast;
import java.util.HashMap;

public class IfStmt extends Stmt{

    final Cond cond;
    final Stmt stmt;

    public IfStmt(Cond cond, Stmt stmt, Location loc){
        super(loc);
        this.cond = cond;
        this.stmt = stmt;
    }

    @Override
    Object exec(HashMap<String,Object> env) {
        
        if ((Boolean)cond.eval(env) == true){
            return stmt.exec(env);
        }
        return null;
    }
}

