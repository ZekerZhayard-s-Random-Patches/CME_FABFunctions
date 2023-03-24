
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "World_<init>": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/world/World",
                "methodName": "<init>",
                "methodDesc": "(Lnet/minecraft/world/storage/ISpawnWorldInfo;Lnet/minecraft/util/RegistryKey;Lnet/minecraft/world/DimensionType;Ljava/util/function/Supplier;ZZJ)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTFIELD && node.owner.equals("net/minecraft/world/World") && node.name.equals(ASMAPI.mapField("field_147482_g")) && node.desc.equals("Ljava/util/List;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "io/github/zekerzhayard/cme_fabfunctions/CopyOnWriteArrayListWithMutableIterator", "create", "()Ljava/util/List;", false));
                    }
                }
                return mn;
            }
        }
    }
}
