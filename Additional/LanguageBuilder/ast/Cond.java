package ast;
import java.util.HashMap;

public abstract class Cond extends ASTNode {

    Cond(Location loc) {
        super(loc);
    }

    abstract Object eval(HashMap<String,Object> env);
}

