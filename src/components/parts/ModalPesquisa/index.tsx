const [genero, setGenero] = useState<string>('-');
const [relacionamento, setRelacionamento] = useState<string>('-');
const [quantidadeFilhos, setQuantidadeFilhos] = useState<number | string>(0);
const [idadeIncialConsumo, setIdadeIncialConsumo] = useState<number | string>(0);

    <FieldAreaStyled>
        <LabelStyled>Sexo</LabelStyled>
        <View style={styles.inputCameraArea}>
            <PickerStyled
                selectedValue={genero}
                onValueChange={(itemValue: any) =>
                    setGenero(itemValue)
                }>
                <Picker.Item label="Masculino" value="m" />
                <Picker.Item label="Feminino" value="f" />
                <Picker.Item label="Prefiro não informar" value="ni" />
            </PickerStyled>
        </View>
    </FieldAreaStyled>


<FieldAreaStyled>
                            <LabelStyled>Nivel atual de relacionamento</LabelStyled>
                            <View style={styles.inputCameraArea}>
                                <PickerStyled
                                    selectedValue={relacionamento}
                                    onValueChange={(itemValue: any) =>
                                        setRelacionamento(itemValue)
                                    }>
                                    <Picker.Item label="- Selecione um nível de relacionamento -" value="" enabled={false} />
                                    <Picker.Item label="Solteiro" value="solteiro" />
                                    <Picker.Item label="Namorando" value="solteiro_namorando" />
                                    <Picker.Item label="Casado" value="casado" />
                                    <Picker.Item label="Separado" value="separado" />
                                    <Picker.Item label="Divorciado (sem relacionamento)" value="divorciado" />
                                    <Picker.Item label="Viúvo (sem relacionamento)" value="viúvo" />
                                </PickerStyled>
                            </View>
                        </FieldAreaStyled>

                        <FieldAreaStyled>
                            <LabelStyled>Possui filhos?</LabelStyled>
                            <View style={styles.inputCameraArea}>
                                <PickerStyled
                                    selectedValue={quantidadeFilhos}
                                    onValueChange={(itemValue: any) =>
                                        setQuantidadeFilhos(itemValue)
                                    }>
                                    <Picker.Item label="Não possuo filhos(as)" value={0} enabled={false} />
                                    <Picker.Item label="1 filho(a)" value={1} />
                                    <Picker.Item label="2 filhos(as)" value={2} />
                                    <Picker.Item label="3 filhos(as)" value={3} />
                                    <Picker.Item label="4 filhos(as)" value={4} />
                                    <Picker.Item label="5 filhos(as)" value={5} />
                                    <Picker.Item label="+ de 5 filhos(as)" value='+5' />
                                </PickerStyled>
                            </View>
                        </FieldAreaStyled>

                        <FieldAreaStyled>
                            <LabelStyled>Com quantos anos começou a ver conteúdo explícito?</LabelStyled>
                            <View style={styles.inputCameraArea}>
                                <InputStyled
                                    onChangeText={setIdadeIncialConsumo}
                                    keyboardType="numeric"
                                    value={idadeIncialConsumo}
                                    placeholder="Digite a idade aqui"
                                    maxLength={3}
                                    placeholderTextColor={THEME.COLORS.SEMANTIC_2}
                                />
                            </View>
                        </FieldAreaStyled>