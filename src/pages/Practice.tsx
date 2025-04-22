
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { TipCard } from "@/components/TipCard";

const Practice = () => {
  const [activeTab, setActiveTab] = useState("kcl");
  const [kclAnswers, setKclAnswers] = useState<{ [key: string]: string }>({});
  const [kvlAnswers, setKvlAnswers] = useState<{ [key: string]: string }>({});
  
  const handleKclAnswer = (id: string, value: string) => {
    setKclAnswers(prev => ({ ...prev, [id]: value }));
  };
  
  const handleKvlAnswer = (id: string, value: string) => {
    setKvlAnswers(prev => ({ ...prev, [id]: value }));
  };
  
  const checkKclAnswer = (id: string, correctAnswer: number) => {
    const userAnswer = parseFloat(kclAnswers[id] || "0");
    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
      toast.success("Correct! Well done!");
    } else {
      toast.error(`Not quite. Try again! (Hint: The answer is ${correctAnswer}A)`);
    }
  };
  
  const checkKvlAnswer = (id: string, correctAnswer: number) => {
    const userAnswer = parseFloat(kvlAnswers[id] || "0");
    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
      toast.success("Correct! Well done!");
    } else {
      toast.error(`Not quite. Try again! (Hint: The answer is ${correctAnswer}V)`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Practice Problems
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Apply your understanding of Kirchhoff's Laws to solve these circuit problems
        </p>
        
        <Tabs defaultValue="kcl" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="kcl">KCL Problems</TabsTrigger>
            <TabsTrigger value="kvl">KVL Problems</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kcl" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>KCL Practice Problem 1</CardTitle>
                <CardDescription>
                  Solve for the unknown current in this junction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="relative w-full max-w-sm mx-auto h-64">
                    {/* Node/Junction */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-circuit-junction flex items-center justify-center text-white font-bold">
                      Node
                    </div>
                    
                    {/* Current arrows - Improved to ensure text is fully visible */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-4 w-32 flex items-center">
                      <div className="h-4 w-24 bg-circuit-wire flex items-center">
                        <span className="ml-2 text-white whitespace-nowrap">2A →</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-32 flex justify-center">
                      <div className="h-24 w-4 bg-circuit-wire flex flex-col justify-start items-center">
                        <span className="mt-2 text-white whitespace-nowrap">3A ↓</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 h-4 w-32 flex items-center justify-end">
                      <div className="h-4 w-24 bg-circuit-wire flex items-center justify-end">
                        <span className="mr-2 text-white whitespace-nowrap">← ?A</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-32 flex justify-center">
                      <div className="h-24 w-4 bg-circuit-wire flex flex-col justify-end items-center">
                        <span className="mb-2 text-white whitespace-nowrap">1A ↑</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-300">
                    <strong>Problem:</strong> At the junction shown above, currents of 2A and 3A flow into the junction, 
                    and 1A flows out. What is the value of the fourth current (in amps) that must flow out of the junction to satisfy KCL?
                  </p>
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="space-y-2 flex-grow">
                    <Label htmlFor="kcl1">Your Answer (A)</Label>
                    <Input 
                      id="kcl1"
                      type="number" 
                      step="0.1"
                      placeholder="Enter current value..."
                      value={kclAnswers["kcl1"] || ""}
                      onChange={(e) => handleKclAnswer("kcl1", e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={() => checkKclAnswer("kcl1", 4)}
                    className="mt-8 sm:mt-0"
                  >
                    Check Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>KCL Practice Problem 2</CardTitle>
                <CardDescription>
                  Solve for multiple unknown currents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="relative w-full max-w-sm mx-auto h-64">
                    {/* Node/Junction - Improved labels */}
                    <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-circuit-junction flex items-center justify-center text-white font-bold">
                      Node A
                    </div>
                    
                    <div className="absolute top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-circuit-junction flex items-center justify-center text-white font-bold">
                      Node B
                    </div>
                    
                    {/* Current arrows - Fixed text visibility */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center">
                      <div className="h-4 w-16 bg-circuit-wire flex items-center">
                        <span className="ml-2 text-white whitespace-nowrap">6A →</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 flex justify-center">
                      <div className="h-10 w-4 bg-circuit-wire flex flex-col justify-start items-center">
                        <span className="mt-0 text-white whitespace-nowrap rotate-0">?A ↓</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-[45%] transform -translate-y-1/2 flex items-center">
                      <div className="h-4 w-[100px] bg-circuit-wire flex items-center justify-center">
                        <span className="text-white whitespace-nowrap">→ 3A →</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center justify-end">
                      <div className="h-4 w-16 bg-circuit-wire flex items-center justify-end">
                        <span className="mr-2 text-white whitespace-nowrap">← 2A</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 flex justify-center">
                      <div className="h-10 w-4 bg-circuit-wire flex flex-col justify-end items-center">
                        <span className="mb-0 text-white whitespace-nowrap rotate-0">?A ↑</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-300">
                    <strong>Problem:</strong> In the circuit above:
                  </p>
                  <ul className="list-disc ml-6 mt-2 text-yellow-800 dark:text-yellow-300">
                    <li>Node A has 6A flowing in and 3A flowing to Node B</li>
                    <li>Node B has 3A flowing in from Node A and 2A flowing out to the right</li>
                    <li>Both nodes have additional currents (marked with ?) flowing to ground</li>
                  </ul>
                  <p className="mt-2 text-yellow-800 dark:text-yellow-300">
                    Find the missing current values to satisfy KCL at both nodes.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor="kcl2a">Current from Node A to ground (A)</Label>
                      <div className="flex gap-3">
                        <Input 
                          id="kcl2a"
                          type="number" 
                          step="0.1"
                          placeholder="Enter current value..."
                          value={kclAnswers["kcl2a"] || ""}
                          onChange={(e) => handleKclAnswer("kcl2a", e.target.value)}
                        />
                        <Button 
                          onClick={() => checkKclAnswer("kcl2a", 3)}
                          size="sm"
                        >
                          Check
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor="kcl2b">Current from ground to Node B (A)</Label>
                      <div className="flex gap-3">
                        <Input 
                          id="kcl2b"
                          type="number" 
                          step="0.1"
                          placeholder="Enter current value..."
                          value={kclAnswers["kcl2b"] || ""}
                          onChange={(e) => handleKclAnswer("kcl2b", e.target.value)}
                        />
                        <Button 
                          onClick={() => checkKclAnswer("kcl2b", 1)}
                          size="sm"
                        >
                          Check
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <TipCard title="KCL Problem-Solving Tips">
              <ul className="list-disc pl-5 space-y-1">
                <li>Always start by identifying all currents entering and leaving each node</li>
                <li>Remember that ∑I<sub>in</sub> = ∑I<sub>out</sub> at any junction</li>
                <li>Draw arrows to clearly indicate current directions</li>
                <li>For complex circuits, analyze one node at a time</li>
              </ul>
            </TipCard>
          </TabsContent>
          
          <TabsContent value="kvl" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>KVL Practice Problem 1</CardTitle>
                <CardDescription>
                  Find the missing voltage in a loop
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="relative w-full max-w-sm mx-auto h-64">
                    {/* Circuit diagram - Improved component sizing and text placement */}
                    <div className="w-full h-full relative">
                      {/* Battery */}
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-24 bg-circuit-battery rounded-md flex flex-col items-center justify-center text-white shadow-md">
                        <div className="h-1/2 border-b border-white w-full flex items-center justify-center">+</div>
                        <div className="h-1/2 w-full flex items-center justify-center">-</div>
                      </div>
                      <div className="absolute left-[56px] top-1/2 transform -translate-y-1/2 text-sm">
                        <span className="text-circuit-battery font-medium whitespace-nowrap">12V</span>
                      </div>
                      
                      {/* Wire Loop */}
                      <div className="absolute left-[56px] right-[36px] top-[32px] h-2 bg-circuit-wire"></div>
                      <div className="absolute right-[36px] top-[32px] bottom-[32px] w-2 bg-circuit-wire"></div>
                      <div className="absolute left-[56px] right-[36px] bottom-[32px] h-2 bg-circuit-wire"></div>
                      <div className="absolute left-[56px] top-[32px] bottom-[32px] w-2 bg-circuit-wire"></div>
                      
                      {/* Resistors - Increased size and improved label visibility */}
                      <div className="absolute top-[32px] left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-36 h-12 bg-circuit-resistor rounded flex items-center justify-center text-white shadow-md">
                        <span className="whitespace-nowrap">R₁ = 100Ω</span>
                      </div>
                      <div className="absolute top-2/3 right-[36px] transform translate-x-1/2 -translate-y-1/2 h-28 w-12 bg-circuit-resistor rounded flex items-center justify-center text-white shadow-md rotate-90">
                        <span className="rotate-180 whitespace-nowrap">R₂ = ?Ω</span>
                      </div>
                      
                      {/* Voltage Labels - Repositioned for better visibility */}
                      <div className="absolute top-14 right-1/3 text-sm">
                        <span className="text-circuit-resistor font-medium whitespace-nowrap bg-black/30 px-1 rounded">5V</span>
                      </div>
                      <div className="absolute bottom-1/3 right-16 text-sm">
                        <span className="text-circuit-resistor font-medium whitespace-nowrap bg-black/30 px-1 rounded">?V</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-300">
                    <strong>Problem:</strong> In the circuit above, there is a 12V battery and two resistors in series.
                    The voltage drop across R₁ is 5V. What is the voltage drop across R₂ to satisfy KVL?
                  </p>
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="space-y-2 flex-grow">
                    <Label htmlFor="kvl1">Voltage Drop Across R₂ (V)</Label>
                    <Input 
                      id="kvl1"
                      type="number" 
                      step="0.1"
                      placeholder="Enter voltage value..."
                      value={kvlAnswers["kvl1"] || ""}
                      onChange={(e) => handleKvlAnswer("kvl1", e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={() => checkKvlAnswer("kvl1", 7)}
                    className="mt-8 sm:mt-0"
                  >
                    Check Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>KVL Practice Problem 2</CardTitle>
                <CardDescription>
                  Determine the voltage source value
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="relative w-full max-w-sm mx-auto h-64">
                    <div className="w-full h-full relative">
                      {/* Battery 1 - Improved sizing and label visibility */}
                      <div className="absolute left-4 top-1/3 transform -translate-y-1/2 w-12 h-20 bg-circuit-battery rounded-md flex flex-col items-center justify-center text-white shadow-md">
                        <div className="h-1/2 border-b border-white w-full flex items-center justify-center">+</div>
                        <div className="h-1/2 w-full flex items-center justify-center">-</div>
                      </div>
                      <div className="absolute left-20 top-1/3 transform -translate-y-1/2 text-sm">
                        <span className="text-circuit-battery font-medium whitespace-nowrap bg-black/30 px-1 rounded">?V</span>
                      </div>
                      
                      {/* Battery 2 */}
                      <div className="absolute left-4 bottom-1/3 transform translate-y-1/2 w-12 h-20 bg-circuit-battery rounded-md flex flex-col items-center justify-center text-white shadow-md">
                        <div className="h-1/2 border-b border-white w-full flex items-center justify-center">+</div>
                        <div className="h-1/2 w-full flex items-center justify-center">-</div>
                      </div>
                      <div className="absolute left-20 bottom-1/3 transform translate-y-1/2 text-sm">
                        <span className="text-circuit-battery font-medium whitespace-nowrap bg-black/30 px-1 rounded">6V</span>
                      </div>
                      
                      {/* Wire Loop - Adjusted spacing for clarity */}
                      <div className="absolute left-[60px] right-[36px] top-[45px] h-2 bg-circuit-wire"></div>
                      <div className="absolute right-[36px] top-[45px] bottom-[45px] w-2 bg-circuit-wire"></div>
                      <div className="absolute left-[60px] right-[36px] bottom-[45px] h-2 bg-circuit-wire"></div>
                      <div className="absolute left-[60px] top-[45px] h-[22%] w-2 bg-circuit-wire"></div>
                      <div className="absolute left-[60px] bottom-[45px] h-[22%] w-2 bg-circuit-wire"></div>
                      
                      {/* Resistors - Improved sizing for label visibility */}
                      <div className="absolute top-[45px] right-1/3 transform -translate-x-1/2 -translate-y-1/2 w-36 h-12 bg-circuit-resistor rounded flex items-center justify-center text-white shadow-md">
                        <span className="whitespace-nowrap">R₁ = 200Ω</span>
                      </div>
                      <div className="absolute right-[36px] top-1/2 transform translate-x-1/2 -translate-y-1/2 h-36 w-12 bg-circuit-resistor rounded flex items-center justify-center text-white shadow-md rotate-90">
                        <span className="rotate-180 whitespace-nowrap">R₂ = 300Ω</span>
                      </div>
                      <div className="absolute bottom-[45px] right-1/3 transform -translate-x-1/2 translate-y-1/2 w-36 h-12 bg-circuit-resistor rounded flex items-center justify-center text-white shadow-md">
                        <span className="whitespace-nowrap">R₃ = 100Ω</span>
                      </div>
                      
                      {/* Voltage Labels - Added background for better readability */}
                      <div className="absolute top-12 right-1/4 text-sm">
                        <span className="text-circuit-resistor font-medium whitespace-nowrap bg-black/30 px-1 rounded">10V</span>
                      </div>
                      <div className="absolute top-1/2 right-16 text-sm">
                        <span className="text-circuit-resistor font-medium whitespace-nowrap bg-black/30 px-1 rounded">15V</span>
                      </div>
                      <div className="absolute bottom-12 right-1/4 text-sm">
                        <span className="text-circuit-resistor font-medium whitespace-nowrap bg-black/30 px-1 rounded">5V</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-300">
                    <strong>Problem:</strong> In the circuit above, there are two batteries: one with unknown voltage and another with 6V.
                    The voltage drops across the three resistors are 10V, 15V, and 5V respectively. Using KVL, determine the 
                    voltage of the unknown battery.
                  </p>
                </div>
                
                <div className="mt-4">
                  <RadioGroup 
                    value={kvlAnswers["kvl2"] || ""}
                    onValueChange={(value) => handleKvlAnswer("kvl2", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="18" id="kvl2-a" />
                      <Label htmlFor="kvl2-a">18V</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="24" id="kvl2-b" />
                      <Label htmlFor="kvl2-b">24V</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30" id="kvl2-c" />
                      <Label htmlFor="kvl2-c">30V</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="36" id="kvl2-d" />
                      <Label htmlFor="kvl2-d">36V</Label>
                    </div>
                  </RadioGroup>
                  
                  <Button 
                    onClick={() => checkKvlAnswer("kvl2", 24)}
                    className="mt-4"
                  >
                    Check Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <TipCard title="KVL Problem-Solving Tips">
              <ul className="list-disc pl-5 space-y-1">
                <li>Choose a direction to traverse the loop (clockwise or counterclockwise) and be consistent</li>
                <li>Assign proper signs: voltage rises when moving from - to + of a source, voltage drops when moving from + to -</li>
                <li>For resistors, verify that V = IR according to the current direction</li>
                <li>Remember that ∑V = 0 around any closed loop</li>
              </ul>
            </TipCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Practice;
