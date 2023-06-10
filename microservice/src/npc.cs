
public class Npc {
    
    public int Age { get; set; }
    public string EyeColor { get; set; } = "";
    public string Gender { get; set; } = "";
    public string HairColor { get; set; } = "";
    public string Height { get; set; } = "";
    public string Race { get; set; } = "";
    public int Weight { get; set; } = 0;
    
    private static readonly string[] _races = new string[] {
        "Human", 
        "Half-Elf", 
        "Elf", 
        "Half-Orc", 
        "Orc", 
        "Dwarf",
        "Gnome"
    };
    private static readonly string[] _eyecolors = new string[] {
        "Brown", 
        "Green", 
        "Blue", 
        "Hazel", 
        "Gray", 
        "Amber", 
        "Red"
    };
    private static readonly string[] _haircolor = new string[] {
        "Light Brown", 
        "Dark Brown", 
        "Black", 
        "Blonde", 
        "Dirty Blonde", 
        "Red", 
        "Silver", 
        "White", 
        "Gray"
    };
    
    private Npc(){}
    
    public static Npc Generate(){
        return new Npc()
        .GenRace()
        .GenGender()
        .GenHairColor()
        .GenEyeColor()
        .GenHeight()
        .GenWeight()
        .GenAge();
        
    }
    
    private static string ChooseRndm(string[] list){
        return list[new Random().Next(list.Length)];
    }
    
    private Npc GenRace(){ 
        Race = ChooseRndm(_races); 
        return this;
    }
    private Npc GenGender(){
        Gender = new Random().Next() % 2 == 0 ? "Male" : "Female";
        return this;
    }
    
    private Npc GenHairColor() {
        HairColor = ChooseRndm(_haircolor);
        return this;
    }
    
    private Npc GenEyeColor() {
        EyeColor = ChooseRndm(_eyecolors);
        return this;
    }
    private Npc GenHeight(){
        var rand = new Random();
        Height= $"{rand.Next(4,6)}\' {rand.Next(12)}\"";
        return this;
    }
    
    private Npc GenWeight(){
        Weight =  new Random().Next(100, 251);
        return this;
    }
    
    private Npc GenAge(){
        Age = new Random().Next(18, 150);
        return this;
    }
}