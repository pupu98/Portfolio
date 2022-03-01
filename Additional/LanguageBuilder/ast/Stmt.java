package ast;
import java.util.HashMap;

public abstract class Stmt extends ASTNode {

    public Stmt(Location loc) {
        super(loc);
    }

    abstract Object exec(HashMap<String,Object> env);
}


