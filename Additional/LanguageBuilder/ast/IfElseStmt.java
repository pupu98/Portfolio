package ast;
import java.util.HashMap;

public class IfElseStmt extends Stmt{

    final Cond cond;
    final Stmt stmt1;
    final Stmt stmt2;

    public IfElseStmt(Cond cond, Stmt stmt1, Stmt stmt2, Location loc){
        super(loc);
        this.cond = cond;
        this.stmt1 = stmt1;
        this.stmt2 = stmt2;
    }

    @Override
    Object exec(HashMap<String,Object> env) {
        if ((Boolean)cond.eval(env) == true){
            return stmt1.exec(env);
        }else{
            return stmt2.exec(env);
        }
    }
}

