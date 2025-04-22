
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TipCard } from "@/components/TipCard";
import { Voltage, Resistance, checkKVL, calculateVoltage } from "@/utils/circuitUtils";
import { toast } from "sonner";

const KVL = () => {
  const [voltages, setVoltages] = useState<Voltage[]>([
    { id: "v1", value: 9, label: "Battery" },
    { id: "v2", value: -5, label: "R₁" },
    { id: "v3", value: -4, label: "R₂" },
  ]);
  
  const [resistances, setResistances] = useState<Resistance[]>([
    { id: "r1", value: 100, label: "R₁" },
    { id: "r2", value: 200, label: "R₂" },
  ]);
  
  const [current, setCurrent] = useState(0.05); // 50mA
  const [kvlResult, setKvlResult] = useState(() => checkKVL(voltages));
  const [activeTab, setActiveTab] = useState("learn");
  
  // Update voltage drops across resistors when current or resistance changes
  useEffect(() => {
    setVoltages(prev => prev.map(voltage => {
      if (voltage.id === "v2") {
        return { ...voltage, value: -calculateVoltage(current, resistances[0].value) };
      } else if (voltage.id === "v3") {
        return { ...voltage, value: -calculateVoltage(current, resistances[1].value) };
      }
      return voltage;
    }));
  }, [current, resistances]);
  
  // Update KVL check when voltages change
  useEffect(() => {
    setKvlResult(checkKVL(voltages));
  }, [voltages]);
  
  const handleVoltageChange = (id: string, value: number) => {
    setVoltages(voltages.map(v => 
      v.id === id ? { ...v, value } : v
    ));
    
    // If we're updating the battery voltage, recalculate the current
    if (id === "v1") {
      const totalResistance = resistances.reduce((sum, r) => sum + r.value, 0);
      setCurrent(Math.abs(value) / totalResistance);
    }
  };
  
  const handleResistanceChange = (id: string, value: number) => {
    setResistances(resistances.map(r => 
      r.id === id ? { ...r, value } : r
    ));
    
    // When resistances change, recalculate the current
    const totalResistance = resistances
      .map(r => r.id === id ? value : r.value)
      .reduce((sum, r) => sum + r, 0);
    
    const batteryVoltage = voltages.find(v => v.id === "v1")?.value || 0;
    setCurrent(Math.abs(batteryVoltage) / totalResistance);
  };
  
  const checkEquation = () => {
    if (kvlResult.isValid) {
      toast.success("Correct! Kirchhoff's Voltage Law is satisfied.");
    } else {
      toast.error(`Not quite. The sum of voltages around the loop is ${kvlResult.sum.toFixed(2)}V, not 0V.`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Kirchhoff's Voltage Law (KVL)
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Understanding how voltages behave in closed loops in electrical circuits
        </p>
        
        <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="interactive">Interactive Demo</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learn" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What is Kirchhoff's Voltage Law?</CardTitle>
                <CardDescription>
                  A fundamental principle for analyzing voltage in circuits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Kirchhoff's Voltage Law (KVL) states that <strong>the sum of all voltage drops and rises around any closed loop in a circuit must equal zero</strong>.
                </p>
                <div className="py-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-center font-medium text-blue-800 dark:text-blue-300">
                      ∑V = 0
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  This law is based on the conservation of energy - the total energy gained in a closed loop must equal the total energy lost.
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Real-world Analogy:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Think of hiking on a circular trail. If you end up at the same place you started, the net elevation change must be zero - any uphill climbs must be matched by equivalent downhill descents.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>KVL in a Simple Circuit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center p-4">
                    <div className="relative w-64 h-64 border-2 border-circuit-wire rounded-lg">
                      {/* Battery */}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-8 h-16 bg-circuit-battery flex flex-col items-center justify-center text-white font-bold rounded">
                        <div className="h-1/2 border-b border-white flex items-center">+</div>
                        <div className="h-1/2 flex items-center">-</div>
                      </div>
                      
                      {/* Resistor 1 */}
                      <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-16 h-8 bg-circuit-resistor flex items-center justify-center text-white font-bold rounded">
                        R₁
                      </div>
                      
                      {/* Resistor 2 */}
                      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-8 h-16 bg-circuit-resistor flex items-center justify-center text-white font-bold rounded">
                        R₂
                      </div>
                      
                      {/* Current Flow */}
                      <div className="absolute top-1/4 left-1/4 text-circuit-current font-medium">
                        I = 0.05A
                      </div>
                      
                      {/* Voltage Labels */}
                      <div className="absolute bottom-4 left-4 text-circuit-battery font-medium">
                        V = 9V
                      </div>
                      <div className="absolute top-4 right-1/3 text-circuit-resistor font-medium">
                        V₁ = 5V
                      </div>
                      <div className="absolute bottom-1/3 right-4 text-circuit-resistor font-medium">
                        V₂ = 4V
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    <p className="text-gray-800 dark:text-gray-200 text-center">
                      Battery voltage: +9V (voltage rise)
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-center mt-1">
                      Voltage across R₁: -5V (voltage drop)
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-center mt-1">
                      Voltage across R₂: -4V (voltage drop)
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-medium text-center mt-2">
                      +9V + (-5V) + (-4V) = 0V ✓ KVL is satisfied
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Points to Remember</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Voltage rises (sources) are positive, and voltage drops (across resistors, etc.) are negative.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Direction of traversal around the loop is arbitrary, but must be consistent for a given analysis.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      For resistors, voltage drop V = I × R (Ohm's Law).
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      KVL can be applied to any closed loop in a circuit, regardless of shape or complexity.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <TipCard title="Pro Tip: Sign Convention">
              <p className="mb-2">
                When applying KVL, follow these sign conventions:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>If you traverse from - to + of a source, it's a voltage rise (+)</li>
                <li>If you traverse from + to - of a source, it's a voltage drop (-)</li>
                <li>When crossing a resistor in the direction of current flow, it's a voltage drop (-)</li>
                <li>When crossing a resistor against the direction of current flow, it's a voltage rise (+)</li>
              </ul>
            </TipCard>
          </TabsContent>
          
          <TabsContent value="interactive" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Interactive KVL Demonstration</CardTitle>
                <CardDescription>
                  Adjust the circuit parameters to see how KVL works in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-4">
                    {/* Circuit Diagram */}
                    <div className="h-full w-full relative">
                      {/* Battery */}
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-20 bg-circuit-battery rounded-md flex flex-col items-center justify-center text-white shadow-md">
                        <div className="h-1/2 border-b border-white w-full flex items-center justify-center">+</div>
                        <div className="h-1/2 w-full flex items-center justify-center">-</div>
                      </div>
                      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 text-sm">
                        <span className="text-circuit-battery font-medium">{voltages[0].value}V</span>
                      </div>
                      
                      {/* Top Wire */}
                      <div className="absolute left-[56px] top-[32px] w-[calc(100%-112px)] h-2 bg-circuit-wire"></div>
                      
                      {/* Resistor 1 */}
                      <div className="absolute top-[32px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-circuit-resistor rounded flex items-center justify-center text-white shadow-md">
                        <span>{resistances[0].label} = {resistances[0].value}Ω</span>
                      </div>
                      <div className="absolute top-16 right-1/3 text-sm">
                        <span className="text-circuit-resistor font-medium">{Math.abs(voltages[1].value).toFixed(1)}V</span>
                      </div>
                      
                      {/* Right Wire */}
                      <div className="absolute right-[32px] top-[32px] w-2 h-[calc(100%-64px)] bg-circuit-wire"></div>
                      
                      {/* Resistor 2 */}
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-1/2 h-24 w-8 bg-circuit-resistor rounded flex items-center justify-center text-white shadow-md rotate-90">
                        <span className="rotate-180">{resistances[1].label} = {resistances[1].value}Ω</span>
                      </div>
                      <div className="absolute bottom-1/3 right-16 text-sm">
                        <span className="text-circuit-resistor font-medium">{Math.abs(voltages[2].value).toFixed(1)}V</span>
                      </div>
                      
                      {/* Bottom Wire */}
                      <div className="absolute left-[56px] bottom-[32px] w-[calc(100%-112px)] h-2 bg-circuit-wire"></div>
                      
                      {/* Current Flow */}
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-circuit-current/10 px-2 py-1 rounded-full">
                        <span className="text-circuit-current font-medium">I = {current.toFixed(3)}A</span>
                      </div>
                      
                      {/* Current Flow Animation */}
                      <div className="absolute left-[56px] top-[32px] w-[calc(100%-112px)] h-2 overflow-hidden">
                        <div className="absolute w-4 h-2 bg-white/30 animate-current-flow"></div>
                      </div>
                      <div className="absolute right-[32px] top-[32px] w-2 h-[calc(100%-64px)] overflow-hidden">
                        <div className="absolute w-2 h-4 bg-white/30 animate-current-flow"></div>
                      </div>
                      <div className="absolute left-[56px] bottom-[32px] w-[calc(100%-112px)] h-2 overflow-hidden">
                        <div className="absolute w-4 h-2 bg-white/30 animate-current-flow" style={{ animationDirection: 'reverse' }}></div>
                      </div>
                      <div className="absolute left-[48px] top-[32px] w-2 h-[calc(100%-64px)] overflow-hidden">
                        <div className="absolute w-2 h-4 bg-white/30 animate-current-flow" style={{ animationDirection: 'reverse' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Adjust Circuit Parameters</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Battery Voltage (V)</Label>
                        <div className="flex items-center gap-4">
                          <Slider 
                            min={1} 
                            max={20} 
                            step={0.5} 
                            value={[voltages[0].value]}
                            onValueChange={([value]) => handleVoltageChange("v1", value)}
                            className="flex-grow"
                          />
                          <div className="w-16">
                            <Input 
                              type="number" 
                              min={1}
                              max={20}
                              step={0.5}
                              value={voltages[0].value} 
                              onChange={(e) => handleVoltageChange("v1", parseFloat(e.target.value) || 0)}
                              className="text-center"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Resistance R₁ (Ω)</Label>
                        <div className="flex items-center gap-4">
                          <Slider 
                            min={10} 
                            max={500} 
                            step={10} 
                            value={[resistances[0].value]}
                            onValueChange={([value]) => handleResistanceChange("r1", value)}
                            className="flex-grow"
                          />
                          <div className="w-16">
                            <Input 
                              type="number" 
                              min={10}
                              max={500}
                              step={10}
                              value={resistances[0].value} 
                              onChange={(e) => handleResistanceChange("r1", parseFloat(e.target.value) || 0)}
                              className="text-center"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Resistance R₂ (Ω)</Label>
                        <div className="flex items-center gap-4">
                          <Slider 
                            min={10} 
                            max={500} 
                            step={10} 
                            value={[resistances[1].value]}
                            onValueChange={([value]) => handleResistanceChange("r2", value)}
                            className="flex-grow"
                          />
                          <div className="w-16">
                            <Input 
                              type="number" 
                              min={10}
                              max={500}
                              step={10}
                              value={resistances[1].value} 
                              onChange={(e) => handleResistanceChange("r2", parseFloat(e.target.value) || 0)}
                              className="text-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">KVL Validation</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-gray-700 dark:text-gray-300 mb-1">Battery (Voltage Source):</p>
                            <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
                              <p className="font-medium text-green-700 dark:text-green-300">
                                V<sub>battery</sub> = +{voltages[0].value.toFixed(2)} V (rise)
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-gray-700 dark:text-gray-300 mb-1">Voltage Across R₁:</p>
                            <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                              <p className="font-medium text-red-700 dark:text-red-300">
                                V<sub>R₁</sub> = {voltages[1].value.toFixed(2)} V (drop)
                              </p>
                              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                V = I × R = {current.toFixed(3)} A × {resistances[0].value} Ω = {Math.abs(voltages[1].value).toFixed(2)} V
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-gray-700 dark:text-gray-300 mb-1">Voltage Across R₂:</p>
                            <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                              <p className="font-medium text-red-700 dark:text-red-300">
                                V<sub>R₂</sub> = {voltages[2].value.toFixed(2)} V (drop)
                              </p>
                              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                V = I × R = {current.toFixed(3)} A × {resistances[1].value} Ω = {Math.abs(voltages[2].value).toFixed(2)} V
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t">
                            <p className="text-gray-700 dark:text-gray-300 mb-1">KVL Equation:</p>
                            <div className={`p-2 rounded ${
                              kvlResult.isValid 
                                ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300" 
                                : "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                            }`}>
                              <p className="font-medium">
                                {voltages[0].value.toFixed(2)} + ({voltages[1].value.toFixed(2)}) + ({voltages[2].value.toFixed(2)}) = {kvlResult.sum.toFixed(2)}V
                              </p>
                              <p className="font-medium mt-1">
                                {kvlResult.isValid 
                                  ? "✓ KVL Satisfied (Sum ≈ 0V)" 
                                  : "✗ KVL Not Satisfied (Sum ≠ 0V)"}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button 
                            onClick={checkEquation} 
                            className="w-full"
                            variant={kvlResult.isValid ? "default" : "secondary"}
                          >
                            {kvlResult.isValid ? "Verify (Correct!)" : "Check My Circuit"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <TipCard title="Understanding KVL Intuitively">
              <p>
                KVL is based on the principle of conservation of energy. In a closed loop, the total energy gained 
                (from sources) must equal the total energy lost (across components like resistors).
              </p>
              <p className="mt-2">
                Notice how changing one component affects the entire circuit. For example, increasing a resistor value 
                reduces current, which in turn reduces the voltage drop across all resistors.
              </p>
            </TipCard>
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Practice Problems</CardTitle>
                <CardDescription>
                  Test your understanding of Kirchhoff's Voltage Law
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Problem 1: Simple Loop</h3>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      In a circuit loop, there is a 12V battery and two resistors with voltage drops of 5V and 8V.
                      Is KVL satisfied? If not, what should the voltage across the second resistor be?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                      <Input 
                        type="number" 
                        placeholder="Enter correct voltage for resistor 2..."
                        className="max-w-xs"
                      />
                      <Button>Check Answer</Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Apply KVL: ∑V = 0 around the loop.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Problem 2: Multiple Sources</h3>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      A circuit loop contains a 9V battery, a 3V battery (both with positive terminals in the same direction),
                      and three resistors with voltage drops of 4V, 5V, and ?V. What should the voltage drop across the third resistor be?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                      <Input 
                        type="number" 
                        placeholder="Enter voltage for resistor 3..."
                        className="max-w-xs"
                      />
                      <Button>Check Answer</Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Remember to account for the polarities of all sources and voltage drops.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KVL;
